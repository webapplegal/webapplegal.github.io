let codes = [];
const seen = new Set();
// Create new barcode detector
const barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] });
const inputField = document.getElementById("Loc_ID-input");
const video = document.getElementById('video');

// Check for a camera
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  const constraints = {
    video: true,
    audio: false,
    facingMode: 'environment'
  };
  
  // Start video stream
  navigator.mediaDevices.getUserMedia(constraints).then(stream => video.srcObject = stream);
}

// Codes proxy/state
const codesProxy = new Proxy(codes, {
  set (target, prop, value, receiver) {
    // Throw err if value is a number
    // Stops from saving undefined codes
    if (typeof value === 'number') throw value;
    
    target.push(value);
   
    inputField.value = value.rawValue;
    localStorage.setItem("Loc_ID",document.getElementById('Loc_ID-input').value);
    location.href='order.html'
    return true;
  }
});


// Detect code function 
const detectCode = () => {
  barcodeDetector.detect(video).then(codes => {
    // If no codes exit function and clear canvas
    if (codes.length === 0) return;
    
    for (const barcode of codes)  {
      console.log(barcode)
  
      
      // Code in seen set then exit loop 
      if (seen.has(barcode.rawValue)) return;

      // Save barcode to window to use later on
      // then push to the codes proxy
      window.barcodeVal = barcode.rawValue;
      codesProxy.push(barcode);

    }
  }).catch(err => {
  })
}

// Run detect code function every 100 milliseconds
setInterval(detectCode, 100);