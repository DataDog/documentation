import { DOMReady } from '../helpers/documentReady';

const doOnLoad = () => {

    const imageModal = document.getElementById('popupImageModal');
    let modalContent, modalBody, modalDialog;

    if (imageModal) {
        modalContent = imageModal.querySelector('.modal-content');
        modalBody = imageModal.querySelector('.modal-body');
        modalDialog = imageModal.querySelector('.modal-dialog');

        imageModal.addEventListener('show.bs.modal', (e) => {
            const loaderElement = document.createElement('div');
            const imageElement = document.createElement('img');
            const url = `${e.relatedTarget.href}&w=${window.innerWidth}&h=${window.innerHeight}`;
            const srcsetUrl = `${url}, ${url}&dpr=2 2x`;

            loaderElement.setAttribute('class', 'loader');
            loaderElement.style.position = 'absolute';
            loaderElement.style.top = '50%';
            loaderElement.style.margin = '-50px 0 0 -50px';
            loaderElement.style.height = '100px';
            loaderElement.style.width = '100px';

            imageElement.setAttribute('src', url);
            imageElement.setAttribute('srcset', srcsetUrl);
            imageElement.setAttribute('class', 'img-fluid');
            imageElement.style.display = 'none';
            imageElement.addEventListener('load', (e) => {
                resize(imageElement.naturalWidth, imageElement.naturalHeight);
                loaderElement.style.display = 'none';
                imageElement.style.display = 'block';
            });

            document.querySelector('body').classList.remove('modal-open');

            if (modalContent) {
                modalContent.style.background = 'transparent';
                modalContent.style.border = 'none';
                modalContent.style.height = '100%';
            }

            if (modalBody) {
                modalBody.style.height = '100%';
                modalBody.appendChild(loaderElement);
                modalBody.appendChild(imageElement);
            }

            if (modalDialog) {
                modalDialog.style.height = '100%';
            }
        });

        imageModal.addEventListener('hide.bs.modal', () => {
            modalBody.replaceChildren();
        });

        window.addEventListener('resize', () => {
            imageModalVisible = !!(
                imageModal.offsetWidth ||
                imageModal.offsetHeight ||
                imageModal.getClientRects().length
            );
            if (imageModalVisible) {
                const imageElement = imageModal.querySelector('img');
                resize(imageElement.naturalWidth, imageElement.naturalHeight);
            }
        });
    }

    function resize(w, h) {
        var el = document.querySelector('#popupImageModal .modal-body img');
        var p = document.querySelector('#popupImageModal .modal-dialog');
        var parentW = (parseInt(window.innerWidth) / 100) * 90;
        var parentH = (parseInt(window.innerHeight) / 100) * 90;

        if (el && p && w && h) {
            /* Reset apparent image size first so container grows */
            el.style.width = '';
            el.style.height = '';
            p.style.width = '';
            p.style.height = '';

            /* Calculate the worst ratio so that dimensions fit */
            /* Note: -1 to avoid rounding errors */
            var ratio = Math.max(w / (parentW - 1), h / (parentH - 1));
            /* Resize content */
            if (ratio > 1) {
                ratio = h / Math.floor(h / ratio); /* Round ratio down so height calc works */
                el.style.width = `${w / ratio}px`;
                el.style.height = `${h / ratio}px`;
                p.style.width = `${w / ratio}px`;
                p.style.height = `${h / ratio}px`;
            } else {
                el.style.width = `${w}px`;
                el.style.height = `${h}px`;
                p.style.width = `${w}px`;
                p.style.height = `${h}px`;
            }
        }
    }

};

DOMReady(doOnLoad);
