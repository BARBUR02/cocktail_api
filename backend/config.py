import os
from dotenv import load_dotenv


load_dotenv()


def _retrieve_environment_variable(key: str) -> str:
    if not (value := os.getenv(key)):
        raise ValueError("Environment variable for {key} is not set.")
    return value


def openai_api_key() -> str:
    return _retrieve_environment_variable("OPENAI_API_KEY")


def ninja_api_key() -> str:
    return _retrieve_environment_variable("NINJAS_API_KEY")


def api_token() -> str:
    return _retrieve_environment_variable("API_TOKEN")
