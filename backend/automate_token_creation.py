#!/usr/bin/python3
import requests as req


t_url = 'https://gateway.velar.network/swapapp/swap/tokens'
url = 'http://localhost:3000/'

def format(token):
    return {
        'name': token.get('name'),
        'contract_address': token.get('contractAddress'),
        'symbol': token.get('symbol'),
        'image_url': token.get('imageUrl'),
        'price': token.get('price'),
        'asset_name': token.get('assetName')
    }


tokens = req.get(t_url).json();
tokens = tokens.get('message')

for token in tokens:
    try :
        create = req.post(url + 'tokens', json=format(token))
        print(create.json().get('name') + " created")
    except Exception as e:
        print(e)
        print(f"{token.get('name')} not created")
        continue