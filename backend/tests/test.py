#!/usr/bin/python3
"""Automated testng for the api"""
import requests
from pprint import pprint
from datetime import datetime


url = 'http://127.0.0.1:3000/'


##TOKEN

token = {
    'name': 'bitcoin',
    'contract_address': '0x1234567890',
    'symbol': 'BTC',
    'image_url': 'https://bitcoin.com',
}
b_res = requests.post(url + 'tokens', json=token)
print("Token created\n")
pprint(b_res.json())

creator_id = b_res.json().get('id')

token = {
    'name': 'etherum',
    'contract_address': '0x0987654321',
    'symbol': 'ET',
    'image_url': 'https://etherium.com',
}

b_res = requests.post(url + 'tokens', json=token)
print("Token created\n")
pprint(b_res.json())

contender_id = b_res.json().get('id')

b_res = requests.get(url + f'tokens')
print("Get all tokens\n")
pprint(b_res.json())

b_res = requests.get(url + f'tokens', params={'query': '0x1234567890'})
print("Get a token with its contract address\n")
pprint(b_res.json())

b_res = requests.get(url + f'tokens/{contender_id}')
print("Get a particular token\n")
pprint(b_res.json())

b_res = requests.put(url + f'tokens/{contender_id}', json={'symbol': 'ETH'})
print("Update a particular token\n")
pprint(b_res.json())

##BATTLE

battle = {
    'creator_id': creator_id,
    'contender_id': contender_id,
    'time': datetime.now().isoformat()
}
b_res = requests.post(url + 'battles', json=battle)
print("Battle created\n")
pprint(b_res.json())

battle_id = b_res.json().get('id')


b_res = requests.get(url + f'battles', params={'query': 'future'})
print("Get Battle with status\n")
pprint(b_res.json())

b_res = requests.get(url + f'battles/{battle_id}')
print("Get a particular battle\n")
pprint(b_res.json())

b_res = requests.put(url + f'battles/{battle_id}', json={'status': 'past'})
print("Update a particular Battle\n")
pprint(b_res.json())

## SUMMARY

summary = {
    'battle_id': battle_id,
    'winner': 'contender'
}
b_res = requests.post(url + 'summaries', json=summary)
print("Summary created\n")
pprint(b_res.json())

summary_id = b_res.json().get('id')


b_res = requests.get(url + f'summaries')
print("Get All Summaries\n")
pprint(b_res.json())

b_res = requests.get(url + f'summaries/{summary_id}')
print("Get a particular summary\n")
pprint(b_res.json())

b_res = requests.put(url + f'summaries/{summary_id}', json={'winner': 'creator'})
print("Update a particular Summary\n")
pprint(b_res.json())