import React from 'react'
import { withRouter } from 'next/router'

class Home extends React.Component {
    render(){
        console.log(this.props.router.query.email);
        return (

            <h1>ciao</h1>

        );
    }
  // this.props.router.query.name
}

export default withRouter(Home)
