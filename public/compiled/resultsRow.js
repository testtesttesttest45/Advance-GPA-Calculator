/* eslint-disable no-undef */
export default function ResultsRow(props) {
    return React.createElement(
        "tr",
        null,
        React.createElement(
            "td",
            null,
            props.module
        ),
        React.createElement(
            "td",
            null,
            props.credit
        ),
        React.createElement(
            "td",
            null,
            props.grade
        )
    );
}