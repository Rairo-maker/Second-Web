function ipToInt(ip){
    return ip.split('.').reduce((acc,oct)=> (acc<<8) + parseInt(oct),0)>>>0;
}

function intToIp(int){
    return [(int>>>24)&255,(int>>>16)&255,(int>>>8)&255,int&255].join('.');
}

function prefixToMask(prefix){
    let mask = (0xffffffff << (32-prefix)) >>>0;
    return intToIp(mask);
}

function maskToPrefix(mask){
    let binary = ipToInt(mask).toString(2);
    return binary.split('1').length - 1;
}

function calculate(){

    let ipInput = document.getElementById("ip").value;
    let maskInput = document.getElementById("mask").value;

    let prefix;

    if(maskInput.includes("/")){
        prefix = parseInt(maskInput.replace("/",""));
    }else{
        prefix = maskToPrefix(maskInput);
    }

    let mask = prefixToMask(prefix);

    let ipInt = ipToInt(ipInput);
    let maskInt = ipToInt(mask);

    let network = ipInt & maskInt;
    let broadcast = network | (~maskInt >>>0);

    let firstHost = network + 1;
    let lastHost = broadcast - 1;

    document.getElementById("subnet").innerText = mask;
    document.getElementById("network").innerText = intToIp(network);
    document.getElementById("broadcast").innerText = intToIp(broadcast);

    document.getElementById("range").innerText =
        intToIp(network) + " - " + intToIp(broadcast);

    document.getElementById("usable").innerText =
        intToIp(firstHost) + " - " + intToIp(lastHost);

}
