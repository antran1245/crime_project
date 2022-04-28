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
    def get_all(cls):
        query = "SELECT * FROM comments"
        
        result = connectToMySQL(DATABASE).query_db(query)
        
        tables = []
        for table in result:
            tables.append(cls(table))
        return tables
    
    @classmethod
    def insert(cls, data):
        query = "INSERT INTO comments (content, report_id) VALUES (%(content)s,%(report_id)s);"
        return connectToMySQL(DATABASE).query_db(query, data)
    
    