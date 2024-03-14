import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn import svm
import pickle

training = pd.read_csv('./Dataset.csv')
training.drop_duplicates(inplace=True)

X_train = training.drop(['prognosis'], axis=1)
Y_train = training['prognosis']

X_train, X_test, Y_train, Y_test = train_test_split(X_train, Y_train, test_size=0.20, random_state=1)

SVM = svm.SVC(kernel='linear', C=0.09)
SVM.fit(X_train, Y_train)

pickle.dump(SVM, open('ML_model.pkl', 'wb'))
