import React from 'react';
import firebase from 'firebase';

const db = firebase.firestore();

export default class Journal extends React.Component {
    componentDidMount() {
        //not in real time
        //     db.collection('journalEntries')
        //         .get()
        //         .then((querySnapshot) => {
        //             querySnapshot.forEach((doc) => {
        //                 console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        //             });
        //         });


        db.collection('journalEntries')
            .onSnapshot((doc) => {
                console.log(doc)
            })
    }

    render() {
        return (
            <div>
                <h1>Journal</h1>
            </div>
        )
    }
}