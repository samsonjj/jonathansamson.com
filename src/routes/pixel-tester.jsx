import React, { useState, useEffect } from 'react';
import PixelFunctions from '../lib/pixel/pixelEvents';
import blockedPixel from './assets/blocked-pixel.png';
import pixelNetworkEvent from './assets/pixel-network-headers.png';


function purchase() {
  let form = document.getElementById('purchase-form');
  let value = parseInt(form.querySelector('#value').value) || 100.0;
  let currency = form.querySelector('#currency').value || 'USD';
  let data = { value, currency };
  PixelFunctions.purchaseEvent(data);
  alert(`purchase complete with ${JSON.stringify(data)}`);
}

function standardEvent() {
  // fbq('track', 'Lead');
}

function pixelIsReady() {
  return window.fbq.version != '2.0';
}

export default function PixelTester() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    console.log('creating interval');
    const interval = setInterval(() => {
      if (pixelIsReady()) {
        console.log('pixel is ready!');
        setReady(true); 
      }
    }, 200);
  }, []);

  return (
    <>
      <p style={{
        background: ready ? 'green': 'red',
      }}>{ready ? 'Pixel is ready.': 'Pixel is not initialized yet.'}</p>
      <p style={{marginBlockEnd: '0em'}}>Note: PageView is already generated on page load. You don't have to click this button again unless you really want to.</p>

      <button onClick={() => PixelFunctions.pageView()}>PageView</button><br/><br/>
{/* 
      <form id="standard-event" onSubmit={(event) => {event.preventDefault(); standardEvent()}}>
        <label htmlFor="event_name">Value: </label>
        <input type="text" id="event_name" name="event_name"/><br/>
      </form> */}



      <form id="purchase-form" onSubmit={(event) => {event.preventDefault(); purchase()}}>
        <label htmlFor="value">Value: </label>
        <input type="text" id="value" name="value"/><br/>
        <label htmlFor="currency">Currency: </label>
        <input type="text" id="currency"/><br/>
        <input type="submit" value="Purchase"/>
      </form><br/><br/>

      <h1>About This Page</h1>
      <p>
        This page is using the Meta Pixel code to send events to Meta to track conversions.
      </p>
      <h1>Use</h1>

      <ol>
        <li>
          (Optional) Install the <a href="https://developers.facebook.com/docs/meta-pixel/support/pixel-helper">Pixel Helper</a> tool. This will make it more obvious when pixel events are fired, and can give you detailed information about those events.
        </li>
        <li>
          Open this url in chrome incognito mode. This prevents certain things like ad blockers from blocking the pixel code download. The pixel code is a script fetched from over the internet so it can be blocked, and you may see this error in the console if that happens:
          <br />
          <img src={blockedPixel} alt="error logged when pixel code is blocked"></img>
        </li>
        <li>
          Open browser tools, and navigate to the network tab (Windows: ctrl + shift + J, Mac: cmd + option + J);
        </li>
        <li>
          Click on any of the provided event buttons. This will trigger a pixel fire.
          <br />
        </li>
        <li>
          Find the event id by looking at the network tab events, or in the Pixel Helper. Please take a bit to look through the network events, specifically the url query parameters.
          <br />
          <img src={pixelNetworkEvent} alt="network event in chrome debugging tools"></img>
        </li>
        <li>
          Use the event id as you wish.
        </li>
      </ol>

      <h1>Considerations</h1>
      <ol>
        <li><p>This page is implemented with <a href="https://www.npmjs.com/package/react-facebook-pixel">react-facebook-pixel</a>. Debug mode is on, so any pixel fires will be logged to console, with the eventname and data that is sent alongside it. Note: There is more data sent along with the request than is reported here, this is more like a function call debug.</p></li>
      </ol>

      <h1>Learnings</h1>
      <ul>
        <li><p>Pixel prevents spam clicks. SubscribedButtonClick events only happen on same button if you leave some time in between.</p></li>
        <li><p>PageView can be implemented as a function call, but in the copy and paste pixel code, it's coded as an image load. This is because an image load with an external source will trigger a http request to fetch that image, but instead the url is really the pixel api endpoint.</p></li>
      </ul>
    </>
  )
}