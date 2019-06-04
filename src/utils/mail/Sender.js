/*
 * A collection of utility methods used to send mail to another user
 */
 import * as blockstack from 'blockstack';

 export class Sender {
   // Sends a message to a single recepient
   sendMessageTo(message, receiverID) {

     // get the users private key
     blockstack.getFile('pk.txt', {username: receiverID, encrypt:false})
      .then(privateKey => {
        const msgID = msg.id;
        const msgString = JSON.stringify(message);

        // write the message to our local storage
        blockstack.putFile('outbox/' + msgID + '.json', msgString, {encrypt:true})
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.error(err);
          })

        // write the message to the receiver's outbox
        const path = receiverID + '/outbox/' + msgID + '.json';
        blockstack.putFile(path , msgString, {encrypt: privateKey})
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.error(err);
          })

        // update our global message sent list
        blockstack.getFile('outbox/messages.json', {encrypt:true})
          .then(messages => {
            messagesArray = JSON.parse(messages);
            messagesArray.push(msgID);
            return blockstack.putFile('outbox/messages.json', JSON.stringify(messagesArray), {encrypt:true})
          })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.error(err);
          })

          // update the receiver's message sent list
          blockstack.getFile(receiverID + '/outbox/messages.json', {encrypt:true})
            .then(messages => {
              messagesArray = JSON.parse(messages);
              messagesArray.push(msgID);
              return blockstack.putFile(receiverID + 'outbox/messages.json', JSON.stringify(messagesArray), {encrypt:true})
            })
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.error(err);
            })
      })
      .catch(err => {
        console.error(err);
      });
   }
 }
