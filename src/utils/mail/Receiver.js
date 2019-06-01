/*
 * A collection of utility methods used to pull mail from other users.
 * For all the calls in this page you are the recipient
 */
import * as blockstack from blockstack;
const Message = require("../../modles/Messages.js");
function getMessageID(recieverID, senderID) {
    blockstack.getFile(recieverID + "\\outbuox\\messages.json", { username: senderID, decrypt: false }).then(
        stringifiedArray => {
            return JSON.parse(stringifiedArray)[0];
        }
    );
    //PARSE ARRAY OF JSON
    return messageIDArray[0];
};
module.exports = {
    method: function getMessage(recieverID, senderID) {
        return getMessageID(recieverID, senderID).then(
            messageID => {
                return blockstack.getFile(recieverID + "\\outbox\\" + messageID, { username: senderID, decrypt: false }).then(
                    stringifiedContents => {
                        var message = JSON.parse(stringifiedContents);
                        return new Message(messageContents.ID, messageContents.Title, senderID, recieverID, messageContents.content);
                    }
                );
            }
        );
    }
};

