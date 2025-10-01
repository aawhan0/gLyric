# Use official Python 3.10 slim image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy all files from the repo to the container
COPY . /app

# Install dependencies
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Expose the port your app will run on (update if needed)
EXPOSE 7860

# Start the app (update to Streamlit/Gradio/Flask command if needed)
CMD ["python", "main.py"]
