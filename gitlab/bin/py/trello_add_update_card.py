#!/usr/bin/env python3

import json
import os
from optparse import OptionParser
import time

import requests

API_KEY = os.environ.get('TRELLO_API_KEY', None)
API_TOKEN = os.environ.get('TRELLO_API_TOKEN', None)


def _validate_card_date(card_name, date=time.strftime('%Y%m%d')):
    """
    verify the date of a trello card based on its name
    :param card_name: str
    :param date: hyphen sep datestr -> YYYYmmdd
    :return: bool
    """
    assert isinstance(card_name, str), "no card_name found."

    if card_name.find(date) != -1:
        return True
    return False


def trello_add_update_card(board_id, card_name, card_text, list_id=None, members=None):
    """
    add or update a trello card
    :param board_id: str
    :param card_name: str
    :param card_text: str
    :param list_id: str
    :param members: comma sep str
    :return:
    """
    assert isinstance(board_id, str), "no board_id found."
    assert isinstance(card_name, str), "no card_name found."
    auth = "&key={0}&token={1}".format(API_KEY, API_TOKEN)
    search_url = "https://api.trello.com/1/search?query={0}&cards_fields=name&cards_limit=1&idBoards={1}&{2}".format(
        card_name,
        board_id,
        auth
    )
    # anything to write?
    print("card text: {}".format(card_text))
    if not card_text.strip():
        print("nothing to update on trello board.")
        exit(0)

    # does card already exist?
    print("searching trello board for cards matching: %s" % card_name)
    search_response = requests.get(search_url)
    if search_response.status_code == 200:
        results = json.loads(search_response.text)
        cards = results.get('cards', [])
        if cards and cards[0]['name'] == card_name and _validate_card_date(cards[0]['name']):
            card_id = cards[0].get('id')
            cards_url = "https://api.trello.com/1/cards/{0}/actions/comments".format(card_id)
            print("updating trello with following params:\n\tlist_id: {0}\n\tcard_name: {1}\n\tcard_text: {2}".format(
                list_id,
                card_name,
                card_text
            ))
            update_response = requests.post(cards_url, {"text": card_text, "token": API_TOKEN, "key": API_KEY})
            if update_response.status_code == 200:
                exit(0)
            else:
                print(update_response.text)
                exit(1)
        elif _validate_card_date(card_name):
            cards_url = "https://api.trello.com/1/cards"
            print("updating trello with following params:\n\tlist_id: {0}\n\tcard_name: {1}\n\tcard_text: {2}".format(
                list_id,
                card_name,
                card_text
            ))
            params = {
                "key": API_KEY,
                "token": API_TOKEN,
                "idList": list_id,
                "name": card_name,
                "desc": card_text
            }
            if members:
                params.update({"idMembers": members})
            create_response = requests.post(cards_url, params)
            if create_response.status_code == 200:
                exit(0)
            else:
                print(create_response.text)
                exit(1)
        else:
            print("This card name does not match allowable formats.")
            exit(1)
    else:
        print(search_response.text)
        exit(1)


def main():
    """
    wrapper for taking cli params
    """
    parser = OptionParser(usage="usage: %prog [options]")
    parser.add_option("-b", "--board_id", help="boardID")
    parser.add_option("-n", "--card_name", help="card name to use for search query")
    parser.add_option("-t", "--card_text", help="what do you want to add to the card?")
    parser.add_option("-l", "--list_id", help="listID", default=None)
    parser.add_option("-m", "--members", help="comma separated members list", default=None)

    (options, args) = parser.parse_args()

    trello_add_update_card(**vars(options))


if __name__ == "__main__":
    main()
