from flask_app.config.mysqlconnection import connectToMySQL
from flask_app import DATABASE
class Report:
    
    def __init__(self, data):
        self.id = data['id']
        self.incident_number = data['incident_number']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
    
    @classmethod
    def insert(cls, data):
        query = "INSERT INTO reports (incident_number) VALUES (%(incident_number)s);"
        return connectToMySQL(DATABASE).query_db(query, data)
    
    @classmethod
    def report_number_exist(cls,data):
        query = "SELECT * FROM reports WHERE incident_number=%(incident_number)s;"
        result = connectToMySQL(DATABASE).query_db(query, data)
        print(result)
        return result
    
    @classmethod
    def select(cls, data):
        query = "SELECT * FROM reports WHERE incident_number=%(incident_number)s;"
        result = connectToMySQL(DATABASE).query_db(query, data)
        return cls(result[0])
    