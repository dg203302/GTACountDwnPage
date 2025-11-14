(function(){
  try {
    const mark = 'swCleaned';
    const doCleanup = async () => {
      let needReload = false;
      if ('serviceWorker' in navigator) {
        try {
          const regs = await navigator.serviceWorker.getRegistrations();
          for (const r of regs) {
            const ok = await r.unregister();
            if (ok) needReload = true;
          }
        } catch (e) {
          console.warn('SW unregister failed', e);
        }
      }
      if ('caches' in window) {
        try {
          const keys = await caches.keys();
          await Promise.all(keys.map(k => caches.delete(k)));
        } catch (e) {
          console.warn('Cache cleanup failed', e);
        }
      }
      if (needReload && !sessionStorage.getItem(mark)) {
        sessionStorage.setItem(mark, '1');
        location.reload();
      }
    };

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      doCleanup();
    } else {
      document.addEventListener('DOMContentLoaded', doCleanup);
    }
  } catch (e) {
    console.warn('SW cleanup script error', e);
  }
})();
