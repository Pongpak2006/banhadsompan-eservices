async function loadConfig() {
  // cache-bust ให้เห็นอัปเดตเร็วขึ้นหลังผู้ดูแลแก้
  const url = `config.json?v=${Date.now()}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("โหลด config.json ไม่สำเร็จ");
  return await res.json();
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = value ?? "";
}

function setLink(id, href, labelFallback) {
  const el = document.getElementById(id);
  if (!el) return;

  if (!href) {
    el.setAttribute("href", "#");
    if (labelFallback) el.textContent = labelFallback;
    return;
  }
  el.setAttribute("href", href);
}

function setMailPhone() {
  const phoneEl = document.getElementById("phone");
  const emailEl = document.getElementById("email");

  if (phoneEl && phoneEl.textContent.trim()) {
    phoneEl.href = `tel:${phoneEl.textContent.trim().replace(/\s+/g, "")}`;
  }
  if (emailEl && emailEl.textContent.trim()) {
    emailEl.href = `mailto:${emailEl.textContent.trim()}`;
  }
}

function setImage(id, url, hideIfEmpty = true) {
  const el = document.getElementById(id);
  if (!el) return;

  if (!url) {
    if (hideIfEmpty) el.style.display = "none";
    return;
  }
  el.src = url;
  el.style.display = "";
}

(async function init() {
  document.getElementById("year").textContent = new Date().getFullYear();

  try {
    const cfg = await loadConfig();

    // Services
    setText("service1_name", cfg.service1_name);
    setText("service1_desc", cfg.service1_desc);
    setLink("service1_link", cfg.service1_link);

    setText("service2_name", cfg.service2_name);
    setText("service2_desc", cfg.service2_desc);
    setLink("service2_link", cfg.service2_link);

    setText("service3_name", cfg.service3_name);
    setText("service3_desc", cfg.service3_desc);
    setLink("service3_link", cfg.service3_link);

    // About / Contact
    if (cfg.about_content) setText("aboutText", cfg.about_content);

    setText("phone", cfg.phone || "");
    setText("email", cfg.email || "");
    setText("address", cfg.address || "");

    setLink("facebook_url", cfg.facebook_url, "เปิดหน้าเพจ →");
    setLink("map_url", cfg.map_url, "เ
