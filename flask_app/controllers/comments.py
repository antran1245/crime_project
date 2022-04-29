from flask_app  import app
from flask import redirect, request, jsonify
from flask_app.models import report, comment

@app.route('/process/comments/<int:id>', methods=["POST"])
def addComment(id):
    # check if inciden_number is in reports table
    result = report.Report.report_number_exist({"incident_number": id})
    report_id = 0
    if len(result) <= 1:
        report_id = report.Report.insert({"incident_number": id})
    else:
        report_id = report.Report.select({"incident_number": id}).id
    data = {
        "content": request.form['message'],
        "report_id": report_id
    }
    comment.Comment.insert(data)
    return jsonify(message="Add a comment")

@app.route('/process/comments/view/<int:id>')
def viewComment(id):
    data = comment.Comment.get_all_from_incident_number({"incident_number": id})
    return jsonify(data)