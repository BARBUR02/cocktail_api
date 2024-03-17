from typing import Any
from fastapi import HTTPException
import httpx
import requests
import config


def fetch_from_ninja_api(url: str) -> dict[str, Any]:
    response = requests.get(url, headers={"X-Api-Key": config.ninja_api_key()})
    response.raise_for_status()
    return response.json()


async def fetch_from_ninja_api_asynchronously(url: str) -> dict[str, Any]:
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers={"X-Api-Key": config.ninja_api_key()})
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(
                status_code=response.status_code, detail="Failed to fetch data"
            )
