import React, { Component, createContext } from 'react';

export const LanguageContext = createContext();

export class LanguageProvider extends Component {
    constructor(props) {
        super(props);
        this.state = { language: 'french' };
        this.changeLanguage = this.changeLanguage.bind(this);
    }

    // pass in event so we don't need to use function wrapper in component
    changeLanguage(e) {
        this.setState({ language: e.target.value });
    }

    render() {
        return (
            <LanguageContext.Provider
                value={{ ...this.state, changeLanguage: this.changeLanguage }}
            >
                {this.props.children}
            </LanguageContext.Provider>
        );
    }
}

// higher order function that injects context prop to the Component
// pass in languageContext as a prop to the Component
// 'props' is the original props of the Component
export const withLanguageContext = (Component) => (props) => (
    <LanguageContext.Consumer>
        {(value) => <Component languageContext={value} {...props} />}
    </LanguageContext.Consumer>
);
