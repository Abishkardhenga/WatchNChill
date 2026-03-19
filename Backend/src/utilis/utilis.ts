// generate room id and host toke utilis 


const generateRoomId = () => {
    //generate random 6 digit alphanumeric string
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let roomId = "";
    for (let i = 0; i < 6; i++) {
        roomId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return roomId;
}

const generateHostToken = () => {
    //generate random 16 digit alphanumeric string
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let hostToken = "";
    for (let i = 0; i < 16; i++) {
        hostToken += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return hostToken;
}


export { generateRoomId , generateHostToken}