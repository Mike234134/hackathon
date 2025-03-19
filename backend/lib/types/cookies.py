from pydantic import BaseModel
form typing import Optional

class Cookies(BaseModel):
    email: str
    name: str
    user_id: Optional[int] = None
    account_info_id: Optional[int] = None
    metadata: Optional[dict] = None
