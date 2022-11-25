import React from 'react';

const ChanellAdd = () => {
  const state = 1;
  console.log(state);
  return (
    <div className="Toastify">
  <div className="Toastify__toast-container Toastify__toast-container--top-right">
    <div id="cxon7kk" className="Toastify__toast Toastify__toast-theme--light Toastify__toast--success" style="--nth:1; --len:1;">
      <div role="alert" className="Toastify__toast-body">
        <div className="Toastify__toast-icon Toastify--animate-icon Toastify__zoom-enter">
          <svg viewBox="0 0 24 24" width="100%" height="100%" fill="var(--toastify-icon-color-success)">
            <path d="M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"></path>
          </svg>
        </div>
        <div>Канал создан</div>
      </div>
      <button className="Toastify__close-button Toastify__close-button--light" type="button" aria-label="close">
        <svg aria-hidden="true" viewBox="0 0 14 16">
          <path fill-rule="evenodd" d="M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"></path>
        </svg>
      </button>
      <div role="progressbar" aria-hidden="false" aria-label="notification timer" className="Toastify__progress-bar Toastify__progress-bar--animated Toastify__progress-bar-theme--light Toastify__progress-bar--success" style="animation-duration: 5000ms; animation-play-state: paused; opacity: 1;"></div>
    </div>
  </div>
</div>
  );
};
export default ChanellAdd;
