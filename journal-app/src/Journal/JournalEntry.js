import React from 'react';

export default class JournalEntry extends React.Component {
    render() {
        const {id} = this.props.match.params;

        return (
            <div>
                <h1>Journal Entry: {id}</h1>
            </div>
        );
    }
}
