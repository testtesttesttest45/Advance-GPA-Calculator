/* eslint-disable object-shorthand */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-var */
/* eslint-disable one-var */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-undef */
import ResultsRow from './resultsRow';

export default function ResultsTable(props) {
    return React.createElement(
        "table",
        { className: "spTable", id: "resultTable" },
        React.createElement(
            "thead",
            null,
            React.createElement(
                "tr",
                null,
                React.createElement(
                    "th",
                    null,
                    "Module"
                ),
                React.createElement(
                    "th",
                    null,
                    "Credit Unit"
                ),
                React.createElement(
                    "th",
                    null,
                    "Grade"
                )
            )
        ),
        React.createElement(
            "tbody",
            null,
            props.rows.map(function (_ref) {
                var module = _ref.module,
                    credit = _ref.credit,
                    grade = _ref.grade;
                return React.createElement(ResultsRow, { module: module, credit: credit, grade: grade });
            })
        )
    );
}