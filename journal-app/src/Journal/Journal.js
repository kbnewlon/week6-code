import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

const db = firebase.firestore();

export default class Journal extends React.Component {
    state = {
        journalEntries: []
    }

    componentDidMount() {
        // db.collection('journalEntries')
        //     .get()
        //     .then((querySnapshot) => {
        //         querySnapshot.forEach((doc) => {
        //             console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        //         });
        //     });

        this.unsubscribe = db.collection('journalEntries')
            .orderBy('createdAt', 'asc')
            .onSnapshot((data) => {
                // console.log(data.docs);
                // data.docs.forEach(doc => {
                //     console.log(doc.id, doc.data());
                // });
                const journalEntries = data.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                });

                this.setState({
                    journalEntries
                })
            });
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    render() {
        const journalEntries = this.state.journalEntries
            .map(entry => {
                return (
                    <li key={entry.id}>
                        <Link to={`/journal/${entry.id}`}>
                            {entry.entry}
                        </Link>
                    </li>
                );
            });

        return (
            <div>
                <h1>Journal</h1>
                <ul>
                    {journalEntries}
                </ul>
            </div>
        )
    }
}

// function Journal {
//     useEffect(() => {
//         // Firestore code here

//         return () => {
//             unsubscribe();
//         }
//     });

//     return ...
// }