import ReactPixel from 'react-facebook-pixel';

function purchaseEvent({ value, currency }) {
  ReactPixel.track('Purchase', { value, currency }); 
}

function pageView() {
  ReactPixel.pageView();
}

export default {
  purchaseEvent,
  pageView,
};