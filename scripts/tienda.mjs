/**
 * QA de la capa de comercio: catálogo, filtros, variantes, carrito, persistencia y checkout.
 * Comprueba comportamiento real, no maquetación: que añadir sume, que el precio cuadre con el
 * catálogo y que el checkout no diga en ningún momento que ha cobrado algo.
 *   URL=http://localhost:3100 node scripts/tienda.mjs
 */
import { chromium } from "playwright";

const BASE = (process.env.URL || "http://localhost:3100").replace(/\/$/, "");
const browser = await chromium.launch();
const out = [];
let fallos = 0;
const check = (nombre, ok, detalle = "") => {
  if (!ok) fallos++;
  out.push(`${ok ? "ok  " : "FALLA"} · ${nombre}${detalle ? " · " + detalle : ""}`);
};

const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errs = [];
page.on("pageerror", (e) => errs.push(e.message));
page.on("console", (m) => m.type() === "error" && errs.push(m.text()));

// ---------- Catálogo y filtros ----------
await page.goto(`${BASE}/tienda/`, { waitUntil: "networkidle" });
await page.waitForTimeout(600);
const total = await page.locator(".pcard").count();
check("la tienda lista los 9 productos", total === 9, `contados ${total}`);

await page.goto(`${BASE}/tienda/?categoria=colchones`, { waitUntil: "networkidle" });
await page.waitForTimeout(500);
const colchones = await page.locator(".pcard").count();
check("el filtro de categoría por URL recorta el listado", colchones === 3, `contados ${colchones}`);

await page.goto(`${BASE}/tienda/`, { waitUntil: "networkidle" });
await page.waitForTimeout(500);
await page.fill(".tienda__buscar input", "lino");
await page.waitForTimeout(600);
const buscados = await page.locator(".pcard").count();
check("la búsqueda cruza categorías", buscados > 0 && buscados < 9, `contados ${buscados}`);

await page.fill(".tienda__buscar input", "zzzz");
await page.waitForTimeout(600);
check("sin resultados hay estado vacío, no una rejilla en blanco", await page.locator(".tienda__vacio").isVisible());

// ---------- Ficha: variantes y precio ----------
await page.goto(`${BASE}/producto/esencial/`, { waitUntil: "networkidle" });
await page.waitForTimeout(700);
const precioInicial = (await page.locator(".pdp__importe").innerText()).trim();
check("el selector de medida es un radiogroup", (await page.locator('.pdp__variantes-lista[role="radiogroup"]').count()) === 1);
const variantes = page.locator(".pdp__variante:not(.is-agotada)");
await variantes.nth(await variantes.count() - 1).click();
await page.waitForTimeout(300);
const precioFinal = (await page.locator(".pdp__importe").innerText()).trim();
check("cambiar de medida cambia el precio", precioInicial !== precioFinal, `${precioInicial} → ${precioFinal}`);

// ---------- Añadir al carrito ----------
await page.click(".pdp__anadir, .pdp__añadir");
await page.waitForTimeout(800);
check("añadir abre el panel del carrito", await page.locator('.drawer__panel[data-state="open"]').isVisible());
const badge = (await page.locator(".nav__cuenta").innerText().catch(() => "0")).trim();
check("el contador de la cabecera marca 1", badge === "1", `badge=${badge}`);
const importeLinea = (await page.locator(".dline__importe").first().innerText()).trim();
check("la línea del carrito repite el precio de la variante elegida", importeLinea === precioFinal, `${importeLinea} vs ${precioFinal}`);

// Cantidad
await page.click(".dline .qty__btn:last-child");
await page.waitForTimeout(400);
const badge2 = (await page.locator(".nav__cuenta").innerText()).trim();
check("subir la cantidad actualiza el contador", badge2 === "2", `badge=${badge2}`);

// ---------- Accesibilidad del panel (la aporta el Sheet de shadcn) ----------
const dlg = page.locator('.drawer__panel[data-state="open"]');
// Radix ya no usa aria-modal: oculta el resto del árbol con aria-hidden, que las ayudas técnicas
// respetan mejor. Se comprueba el mecanismo real, no el atributo.
const modal = await page.evaluate(() => ({
  rol: document.querySelector('.drawer__panel[data-state="open"]')?.getAttribute("role"),
  restoOculto: document.querySelector("nav")?.closest('[aria-hidden="true"]') !== null,
  sinPuntero: getComputedStyle(document.body).pointerEvents === "none",
}));
check("el panel es un diálogo y aísla el resto de la página", modal.rol === "dialog" && modal.restoOculto && modal.sinPuntero, JSON.stringify(modal));
check("el foco entra en el panel al abrirse", await page.evaluate(() => !!document.activeElement?.closest(".drawer__panel")));
await page.keyboard.press("Escape");
await page.waitForTimeout(600);
check("Escape cierra el panel", (await page.locator('.drawer__panel[data-state="open"]').count()) === 0);

// ---------- Persistencia ----------
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(900);
const badge3 = (await page.locator(".nav__cuenta").innerText().catch(() => "-")).trim();
check("el carrito sobrevive a la recarga", badge3 === "2", `badge=${badge3}`);

// ---------- Página de carrito y totales ----------
await page.goto(`${BASE}/carrito/`, { waitUntil: "networkidle" });
await page.waitForTimeout(700);
const totales = await page.locator(".carrito__totales").innerText();
check("el resumen muestra subtotal, envío y total", /Subtotal/i.test(totales) && /Env/i.test(totales) && /Total/i.test(totales));
check("el envío gratis se anuncia con su umbral real", /gratis|S\/\s*25|S\/\s*0/i.test(totales), totales.replace(/\n/g, " | "));

// ---------- Checkout: validación real ----------
await page.goto(`${BASE}/checkout/`, { waitUntil: "networkidle" });
await page.waitForTimeout(700);
const textoCheckout = (await page.locator(".checkout").innerText()).toLowerCase();
check("el checkout avisa de que no cobra", /no procesa pagos|sin cobro|demostraci/.test(textoCheckout));
check("no hay campos de tarjeta", (await page.locator("input[name*='tarjeta'], input[autocomplete='cc-number']").count()) === 0);

await page.click(".checkout__enviar");
await page.waitForTimeout(500);
const errores = await page.locator(".ckfield__error").count();
check("enviar vacío marca errores en lugar de continuar", errores > 0, `${errores} campos`);
check("con errores no aparece el resultado", (await page.locator(".ckres").count()) === 0);

const campos = { nombre: "Ana Quispe", email: "ana@example.com", telefono: "987654321", direccion: "Av. Arequipa 1234", distrito: "Miraflores" };
for (const [name, valor] of Object.entries(campos)) {
  const input = page.locator(`.ckfield input[name='${name}']`);
  if (await input.count()) await input.fill(valor);
}
await page.click(".checkout__enviar");
await page.waitForTimeout(900);
const res = await page.locator(".ckres").count();
check("con datos válidos se genera el pedido preparado", res === 1);
if (res) {
  const t = (await page.locator(".ckres").innerText()).toLowerCase();
  check("el resultado NO dice compra/pago confirmado", !/(pago (confirmado|recibido|aprobado))|gracias por tu compra|pedido confirmado/.test(t));
  check("el resultado enumera lo que falta conectar", /pasarela|falta/.test(t));
}

// ---------- Móvil: filtros y barra de compra ----------
const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const mp = await mctx.newPage();
mp.on("pageerror", (e) => errs.push("[móvil] " + e.message));
await mp.goto(`${BASE}/tienda/`, { waitUntil: "networkidle" });
await mp.waitForTimeout(700);
await mp.click(".tienda__filtros-btn");
await mp.waitForTimeout(500);
check("en móvil los filtros se abren en panel", await mp.locator('.filtros--panel[data-state="open"]').isVisible());
await mp.keyboard.press("Escape");
await mp.waitForTimeout(400);
await mp.goto(`${BASE}/producto/natura/`, { waitUntil: "networkidle" });
await mp.waitForTimeout(800);
check("en móvil hay barra de compra fija", await mp.locator(".pdp__barra").isVisible());

check("sin errores de consola ni de hidratación", errs.length === 0, errs.slice(0, 4).join(" | "));

console.log(out.join("\n"));
console.log(`\n${fallos === 0 ? "TODO OK" : fallos + " FALLOS"} · ${out.length} comprobaciones`);
await browser.close();
process.exit(fallos ? 1 : 0);
