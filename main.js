document.getElementById('startButton').addEventListener('click', start);
document.getElementById('callButton').addEventListener('click', call);
document.getElementById('hangupButton').addEventListener('click', hangup);

let localStream;
let remoteStream;
let peerConnection;
const configuration = {
    iceServers: [
        {
            urls: 'stun:stun.l.google.com:19302' // Public Google STUN server
        }
    ]
};

async function start() {
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    document.getElementById('localVideo').srcObject = localStream;
}

async function call() {
    peerConnection = new RTCPeerConnection(configuration);
    remoteStream = new MediaStream();
    document.getElementById('remoteVideo').srcObject = remoteStream;

    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = event => {
        event.streams[0].getTracks().forEach(track => {
            remoteStream.addTrack(track);
        });
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    // Send the offer to the other peer using your signaling method

    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            // Send the candidate to the other peer using your signaling method
        }
    };
}

function hangup() {
    peerConnection.close();
    // Handle the hangup process
}

