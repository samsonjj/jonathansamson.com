import React, { useState, useEffect } from 'react';
import PixelFunctions from '../lib/pixel/pixelEvents';
import blockedPixel from './assets/blocked-pixel.png';
import pixelNetworkEvent from './assets/pixel-network-headers.png';

import ReactPixel from 'react-facebook-pixel';


function purchase() {
  console.log('purchase');
  let form = document.getElementById('purchase-form');
  console.log({form});
  let value = parseInt(form.querySelector('#value').value) || 100.0;
  let currency = form.querySelector('#currency').value || 'USD';
  let data = { value, currency };
  PixelFunctions.purchaseEvent(data);
  alert(`purchase complete with ${JSON.stringify(data)}`);
}

function standardEvent() {
  let eventName = document.getElementById('standard-event-form').querySelector('#eventName').value;
  let data = document.getElementById('standard-event-form').querySelector('#data').value;
  ReactPixel.track(eventName, data);
}

function pixelIsReady() {
  // when pixel is uninitialized, version = '2.0', set by local code.
  // when remote pixel code is sourced, it updates the version to something newer.
  return window.fbq.version != '2.0';
}

class InputDefinition {
  constructor(label, id) {
    this.label = label;
    this.id = id;
  }
}

function SimpleForm(props) {
  let rows = props.questions.map((question) => 
    <div class="form-child">
      <label htmlFor={question.id}>{question.label}</label>
      <input type="text" id={question.id}/><br/>
    </div>
  );
  return (
    <form class="simple-form" id={props.id} onSubmit={(e) => {
        e.preventDefault();
        if (props.onSubmit) {
          props.onSubmit();
        }
    }}>
      <div class="form-header">
        { props.title && <h2>{props.title || 'default title'}</h2> }
        { props.description && <p class='form-description'>{props.description || 'default title'}</p> }
      </div>
      {rows}
      <div class="form-child">
        <input type="submit" value={props.buttonText || "Click me"}/>
      </div>
    </form>
  );
}

export default function PixelTester() {
  // Detect pixel readiness and dynamically update UI
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      if (pixelIsReady()) {
        setReady(true); 
      }
    }, 200);
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: 'auto',
      }}>
        <p style={{
          background: ready ? 'green': 'red',
        }}>{ready ? 'Pixel is ready.': 'Pixel is not initialized yet. (May be blocked by ad blockers, try incognito mode)'}</p>
        <p style={{marginBlockEnd: '0em'}}>Note: PageView is already fired on page load. You don't have to click this button again unless you really want to.</p>

        <button onClick={() => PixelFunctions.pageView()}>PageView</button><br/><br/>
      
        <SimpleForm
          title="Standard Event:"
          description={
            <>See the full list of standard events here. <a href="https://www.facebook.com/business/help/402791146561655?id=1205376682832142">here</a>.</>
          }
          id="standard-event-form"
          questions={[
            {label: 'Event Name', id: 'event_name' },
            {label: 'Data', id: 'data' },
          ]}
          buttonText="Send"
          onSubmit={standardEvent}>
        </SimpleForm><br/>

        <SimpleForm id="purchase-form" title="Purchase" onSubmit={purchase} buttonText="Purchase" questions={[
          {label: 'Value', id: 'value'},
          {label: 'Currency', id: 'currency'},
        ]}></SimpleForm>

        <h1>About This Page</h1>
        <p>
          This page is using the Meta Pixel code to send events to Meta to track conversions.
        </p>
        <h1>Use</h1>

        <h3>Install Pixel Helper Tool</h3>
        <p>
          (Optional) Install the <a href="https://developers.facebook.com/docs/meta-pixel/support/pixel-helper">Pixel Helper</a> tool. This will make it more obvious when pixel events are fired, and can give you detailed information about those events.
        </p>
        <h3>Incognito</h3>
        <p>
          Open this url in chrome incognito mode. This prevents certain things like ad blockers from blocking the pixel code download. The pixel code is a script fetched from over the internet so it can be blocked, and you may see this error in the console if that happens:
          <br />
          <img src={blockedPixel} alt="error logged when pixel code is blocked"></img>
        </p>
        <h3>Open Dev Tools</h3>
        <p>
          Open browser tools, and navigate to the network tab (Windows: ctrl + shift + J, Mac: cmd + option + J);
        </p>
        <h3>Fire Pixel Events</h3>
        <p>
          Click on any of the provided event buttons. This will trigger a pixel fire.
        </p>
        <h3>Observe</h3>
        <p>
          Find the event id by looking at the network tab events, or in the Pixel Helper. Please take a bit to look through the network events, specifically the url query parameters.
        </p>
        <br />
        <div class="center-contents">
          <img src={pixelNetworkEvent} alt="network event in chrome debugging tools"></img>
        </div>
        <h3>Analyze</h3>
        <p>
          Use the event id as you wish.
        </p>

        <h1>Considerations</h1>
        <ol>
          <li><p>This page is implemented with <a href="https://www.npmjs.com/package/react-facebook-pixel">react-facebook-pixel</a>. Debug mode is on, so any pixel fires will be logged to console, with the event_name and data that is sent alongside it. Note: There is more data sent along with the request than is reported here, this is more like a function call debug.</p></li>
        </ol>

        <h1>Learnings</h1>
        <ul>
          <li><p>Pixel prevents spam clicks. SubscribedButtonClick events only happen on same button if you leave some time in between.</p></li>
          <li><p>PageView can be implemented as a function call, but in the copy and paste pixel code, it's coded as an image load. This is because an image load with an external source will trigger a http request to fetch that image, but instead the url is really the pixel api endpoint.</p></li>
        </ul>
      </div>
    </div>
  )
}