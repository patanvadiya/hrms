# HR Backend

Install Python 3.12 or later and create a fresh virtual environment for the target machine. Activate it before running the following commands from the backend directory.

    python -m pip install -r requirements.txt
    python -m uvicorn main:app

Set DB_CONNECTION in the server environment. For local development, copy .env.example to .env and supply your database credentials. Create the database and provision its schema separately before enabling endpoints that use it.

GET /health confirms that the API process can respond. Add feature routers to src/api/router.py to expose them under /api/v1.
