Jakub Barber

### Project using external APIs to get patient desired cocktail and based on his/her food preferences find perfect meal to align with 🍸

## Description
For external APIs I am using [API Ninjas](https://api-ninjas.com/api/nutrition) and [OpenAI Chat Completion API](https://openai.com/blog/openai-api).
In order for the app to run, you need to generate your own tokens for those providers, and make sure your tokens are valid and usable.
After generating those, create `.env` files in `backend` and `frontend` directories, and assign concrete keys to them.
For backend:
```
NINJAS_API_KEY=
OPENAI_API_KEY=
API_TOKEN=
```

For frontend:
```
VITE_API_TOKEN=
```

### Instructions
### Setup has been automated and requires only docker on your local machine
In order to start app run:
```
docker compose up
```

### If you don't have docker:
#### In order to setup backend:
```
cd backend
python3 -m venv myenv
source myenv/bin/activate
pip install -r requirements.txt
```

After that to run backend:
```
uvicorn app:app --reload
```
#### For frontend
```
cd frontend
npm install
npm run dev
```


**Voilà! Enjoy your cocktail and meal!**
