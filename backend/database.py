# SQLite 预留接口，当前使用 mock_data，暂未启用
import sqlite3

DB_PATH = "jincheng.db"

def get_connection():
    return sqlite3.connect(DB_PATH)
