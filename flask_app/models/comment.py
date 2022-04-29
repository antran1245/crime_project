from flask_app.config.mysqlconnection import connectToMySQL
from flask_app import DATABASE
class Comment:
    
    def __init__(self, data):
        self.id = data['id']
        self.content = data['content']
        self.report_id = data['report_id']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        
    @classmethod
    def get_all_from_incident_number(cls, data):
        query = "SELECT content, comments.created_at, comments.updated_at FROM comments LEFT JOIN reports ON report_id = reports.id WHERE reports.incident_number = %(incident_number)s ORDER BY created_at"
        result = connectToMySQL(DATABASE).query_db(query, data)
        return result
    
    @classmethod
    def insert(cls, data):
        query = "INSERT INTO comments (content, report_id) VALUES (%(content)s,%(report_id)s);"
        return connectToMySQL(DATABASE).query_db(query, data)