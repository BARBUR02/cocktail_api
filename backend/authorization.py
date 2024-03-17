from fastapi import HTTPException, Security
from fastapi.security import APIKeyHeader
import config


def verify_token(
    request_token: str | None = Security(APIKeyHeader(name="ApiToken")),
) -> None:
    if not request_token or not config.api_token() == request_token:
        raise HTTPException(status_code=401)
