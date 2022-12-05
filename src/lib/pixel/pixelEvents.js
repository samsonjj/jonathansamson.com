import ReactPixel from 'react-facebook-pixel';

function purchaseEvent({ value, currency }) {
  ReactPixel.track('Purchase', { value, currency }); 
}

function pageView() {
  console.log('doinga page view');
  ReactPixel.pageView();
}

export default {
  purchaseEvent,
  pageView,
};