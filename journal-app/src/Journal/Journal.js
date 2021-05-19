import React from 'react';
import { Link } from 'react-router-dom';
import AddJournalEntry from './AddJournalEntry';
import DeleteButton from './DeleteButton';
import db from '../firebase/db';

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
                        <DeleteButton id={entry.id} />
                        <Link to={`/journal/${entry.id}`}>
                            {entry.entry}
                        </Link>
                    </li>
                );
            });

        return (
            <div>
                <h1>Journal</h1>
                <AddJournalEntry />
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