/*
 * A collection of utility methods used to send mail to another user
 */
 import * as blockstack from blockstack;

 module.exports = {
   method: function sendMessageTo(message, receiverID) {

     // get the users private key
     blockstack.getFile('pk.txt', {username: receiverID, encrypt:false})
      .then(privateKey => {
        // first, write the message to our local storage
      })
   },
 }
