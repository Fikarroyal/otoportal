export function showToast(message, duration = 2600) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const el = document.createElement('div');
  el.className =
    'pointer-events-auto flex items-center gap-2 rounded-xl border border-neutral-200 bg-white text-neutral-900 shadow-lg px-4 py-3 text-sm font-medium opacity-0 translate-y-2 transition-all duration-300';
  el.textContent = message;
  container.appendChild(el);

  requestAnimationFrame(() => {
    el.classList.remove('opacity-0', 'translate-y-2');
  });

  window.setTimeout(() => {
    el.classList.add('opacity-0', 'translate-y-2');
    window.setTimeout(() => el.remove(), 300);
  }, duration);
}
