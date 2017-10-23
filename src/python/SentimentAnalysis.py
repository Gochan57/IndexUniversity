# -*- coding: utf-8 -*-

from googletrans import Translator
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk
import pymorphy2
import re
import csv
import json



list_key_words = ['учиться', 'поступать', 'преподаватель', 'факультет', 'студент', 'хороший', 'знание', 'университет',
				  'обучение', 'курс', 'образование', 'работа', 'жизнь', 'бюджет', 'самый', 'диплом', 'платный',
				  'вопрос', 'пересдача', 'подсказывать', 'деньги', 'балл', 'уровень', 'интересно',
				  'желание', 'абитуриент', 'проблема', 'кафедра', 'сессия', 'профессия', 'заочный',
				  'общежитие', 'стипендия', 'специалист', 'лекция', 'социальный', 'выпускник', 'практика', 'язык',
				  'информация', 'деканат', 'взятка', 'конкурс', 'зачет', 'декан', 'лентяй', 'удача',
				  'наука', 'учебник', 'семестр', 'жить', 'ошибка', 'шанс', 'зарплата', 'сожаление']


class SentimentAnalPart(object):
	def __init__(self, input_sentence):
		self.input_sentence = input_sentence
		self.translator = Translator()
		self.sid = SentimentIntensityAnalyzer()
		self.morph = pymorphy2.MorphAnalyzer()

		self.list_words_in_sentence = []
		self.list_words_in_normal_form = []
		self.flag_informative_sentence = False
		self.translated_to_eng_sentence = None
		self.dict_tag_score = {}

		self.create_dict_tag_score()
		self.get_all_words_in_sentence()
		self.words_to_normal_form()
		self.check_if_informative()

		if self.flag_informative_sentence is True:
			self.translate_to_eng()
			self.sentence_score = self.sentence_classification()

		self.fill_in_dict_tag_score()

	def create_dict_tag_score(self):
		for inf_word in list_key_words:
			self.dict_tag_score[inf_word] = False

	def get_all_words_in_sentence(self):
		self.list_words_in_sentence = self.input_sentence.split(" ")

	def words_to_normal_form(self):
		for word in self.list_words_in_sentence:
			self.list_words_in_normal_form.append(self.morph.parse(word)[0].normal_form)
			try:
				self.list_words_in_normal_form.append(self.morph.parse(word)[1].normal_form)
				self.list_words_in_normal_form.append(self.morph.parse(word)[2].normal_form)
				self.list_words_in_normal_form.append(self.morph.parse(word)[3].normal_form)
				self.list_words_in_normal_form.append(self.morph.parse(word)[4].normal_form)
			except IndexError:
				pass

	def check_if_informative(self):
		for inf_word in list_key_words:
			for norm_word in self.list_words_in_normal_form:
				if inf_word == norm_word:
					self.flag_informative_sentence = True
					self.dict_tag_score[inf_word] = True

	def translate_to_eng(self):
		self.translated_to_eng_sentence = self.translator.translate(self.input_sentence, dest="en").text

	def sentence_classification(self):
		print(self.translated_to_eng_sentence)
		score = self.sid.polarity_scores(self.translated_to_eng_sentence)["compound"]
		return score

	def fill_in_dict_tag_score(self):
		for key in self.dict_tag_score:
			if self.dict_tag_score[key] is True:
				self.dict_tag_score[key] = self.sentence_score
			else:
				self.dict_tag_score[key] = 0.0


class SentimentAnalReview(object):
	def __init__(self, review):
		self.review = review

		self.list_review_parts = []
		self.dict_tag_score_review = {}

		self.create_dict_tag_score_review()
		self.split_review_into_parts()
		self.calculate_review_score()

	def create_dict_tag_score_review(self):
		for inf_word in list_key_words:
			self.dict_tag_score_review[inf_word] = 0.0

	def split_review_into_parts(self):
		self.list_review_parts = re.split('%%% |, |\.', self.review)

	def calculate_review_score(self):
		for review_part in self.list_review_parts:
			dict_part_tag_score = SentimentAnalPart(review_part).dict_tag_score
			for key in dict_part_tag_score:
				self.dict_tag_score_review[key] += dict_part_tag_score[key]

		'''number_review_parts = len(self.list_review_parts)  # normalization
		for key in self.dict_tag_score_review:
			self.dict_tag_score_review[key] /= number_review_parts'''


class SentimentAnalData(object):
	def __init__(self, input_file):
		self.input_file = input_file
		self.dict_index_review = {}
		self.dict_index_dict_tag_score = {}

		self.parse_csv()
		self.create_dict_index_dict_tag_score()
		self.calculate_total_tag_scores()
		self.write_json()

	def parse_csv(self):
		with open(self.input_file, 'r', encoding="cp1251") as csvfile:
			crap_data = csv.reader(csvfile, delimiter=';')
			for line_index, row in enumerate(crap_data):
				if line_index > 0:
					key = row[0]
					if key in self.dict_index_review:
						self.dict_index_review[key].append(row[-1])
					else:
						self.dict_index_review[key] = [row[-1]]

	def create_dict_index_dict_tag_score(self):
		for index in self.dict_index_review:
			dict_tag_score = {}

			for inf_word in list_key_words:
				dict_tag_score[inf_word] = 0.0

			self.dict_index_dict_tag_score[index] = dict_tag_score

	def calculate_total_tag_scores(self):
		for index in self.dict_index_review:
			for review in self.dict_index_review[index]:
				dict_tag_score_review = SentimentAnalReview(review=review).dict_tag_score_review
				for key in dict_tag_score_review:
					self.dict_index_dict_tag_score[index][key] += dict_tag_score_review[key]

	def from_dict_to_list_gosha_pridurok(self, dict_to_convert):
		output_list = []
		for key in dict_to_convert:
			sub_dict = {"tag": key, "value": dict_to_convert[key]}
			output_list.append(sub_dict)
		return output_list

	def write_json(self):
		new_standart_dict = {}
		for key in self.dict_index_dict_tag_score:
			new_standart_dict[key] = self.from_dict_to_list_gosha_pridurok(self.dict_index_dict_tag_score[key])
		with open('data.json', 'w') as fp:
			json.dump(new_standart_dict, fp)


sad = SentimentAnalData("Universities.csv")
