// MODIFIED: Converted to a standard ES module with exports

export function el(tag, htmlOrText, attrs = {}) {
  const n = document.createElement(tag);
  if (htmlOrText != null) {
    if (/(<\w+)/.test(String(htmlOrText))) n.innerHTML = htmlOrText;
    else n.textContent = htmlOrText;
  }
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") n.className = v;
    else n.setAttribute(k, v);
  }
  return n;
}

export function fmtDate(iso) {
  if (!iso) return "-";
  try {
    // Handles YYYY-MM-DD format correctly
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function idr(num) {
  const number = Number(num) || 0;
  // This formats to "Rp 100.000" without decimals, which is ideal.
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);
}


export function qparam(name) {
  return new URLSearchParams(location.search).get(name);
}

export function badge(status) {
  const statusMap = {
    submitted: ["Menunggu", "warn"],             // Oranye
    approved: ["Disetujui", "info"],              // Biru
    delivering: ["Dalam Perjalanan", "inprogress"], // Ungu Muda
    arriving_soon: ["Hampir Sampai", "super-admin"], // Ungu Tua
    arrived: ["Selesai", "success"],            // Hijau
    rejected: ["Ditolak", "danger"],              // Merah
  };
  const [label, cls] = statusMap[status] || [String(status), ""];
  const badgeElement = el("span", label, { class: `badge ${cls}` });
  return badgeElement;
}
