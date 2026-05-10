import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error

# Load dataset
data = pd.read_csv("advertising.csv")

# Display first 5 rows
print("First 5 Rows:")
print(data.head())

# Dataset information
print("\nDataset Info:")
print(data.info())

# Check missing values
print("\nMissing Values:")
print(data.isnull().sum())

# Visualization
sns.pairplot(data)
plt.show()

# Features and target
X = data[['TV', 'Radio', 'Newspaper']]
y = data['Sales']

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Create model
model = LinearRegression()

# Train model
model.fit(X_train, y_train)

# Predict sales
y_pred = model.predict(X_test)

# Compare actual vs predicted
comparison = pd.DataFrame({
    'Actual Sales': y_test,
    'Predicted Sales': y_pred
})

print("\nActual vs Predicted:")
print(comparison.head())

# Model accuracy
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)

print("\nMean Absolute Error:", mae)
print("Mean Squared Error:", mse)

# Coefficients
print("\nModel Coefficients:")
print("TV:", model.coef_[0])
print("Radio:", model.coef_[1])
print("Newspaper:", model.coef_[2])

# Predict new value
new_data = [[230, 37, 69]]
prediction = model.predict(new_data)

print("\nPredicted Sales for new advertising data:", prediction[0])

# Scatter plot
plt.figure(figsize=(6,4))
plt.scatter(y_test, y_pred)
plt.xlabel("Actual Sales")
plt.ylabel("Predicted Sales")
plt.title("Actual vs Predicted Sales")
plt.show()
