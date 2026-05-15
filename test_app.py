import pytest
import requests
import os
from io import BytesIO
from PIL import Image
import numpy as np

# Base URL for the API
BASE_URL = "http://localhost:5000"

def create_test_image():
    """Create a simple test image for testing purposes."""
    # Create a 224x224 RGB image
    img = Image.new('RGB', (224, 224), color=(128, 128, 128))
    # Add some variation to make it look like an eye
    pixels = np.array(img)
    # Add some circular pattern
    center = (112, 112)
    radius = 80
    for i in range(224):
        for j in range(224):
            if (i - center[0])**2 + (j - center[1])**2 < radius**2:
                pixels[i, j] = [200, 150, 100]  # brownish color
    img = Image.fromarray(pixels)
    return img

def test_predict_endpoint():
    """Test the /predict endpoint with a valid image."""
    # Create a test image
    img = create_test_image()

    # Save to BytesIO to simulate file upload
    img_buffer = BytesIO()
    img.save(img_buffer, format='JPEG')
    img_buffer.seek(0)

    # Prepare the file for upload
    files = {'file': ('test_eye.jpg', img_buffer, 'image/jpeg')}

    # Send POST request to /predict
    response = requests.post(f"{BASE_URL}/predict", files=files)

    # Check status code
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"

    # Parse JSON response
    data = response.json()

    # Check response structure
    assert "status" in data, "Response should contain 'status'"

    # The API may reject the image if it doesn't look like a dog eye
    if data["status"] == "rejected":
        # Check rejection response
        assert "message" in data, "Rejected response should contain 'message'"
        assert "confidence" in data, "Rejected response should contain 'confidence'"
        print(f"Test passed! Image was correctly rejected: {data['message']}")
    elif data["status"] == "success":
        # Check success response
        assert "prediction" in data, "Response should contain 'prediction'"
        assert "confidence" in data, "Response should contain 'confidence'"

        # Check that prediction is one of the expected classes
        expected_classes = ["cataract", "cherry_eye", "conjunctivitis", "corneal_ulcer", "entropion", "healthy"]
        assert data["prediction"] in expected_classes, f"Prediction {data['prediction']} not in expected classes"

        # Check confidence is a number between 0 and 100
        assert isinstance(data["confidence"], (int, float)), "Confidence should be a number"
        assert 0 <= data["confidence"] <= 100, f"Confidence {data['confidence']} should be between 0 and 100"

        print(f"Test passed! Prediction: {data['prediction']}, Confidence: {data['confidence']}%")
    else:
        assert False, f"Unexpected status: {data['status']}"

def test_predict_no_file():
    """Test the /predict endpoint with no file uploaded."""
    response = requests.post(f"{BASE_URL}/predict")

    assert response.status_code == 400, f"Expected 400, got {response.status_code}"
    data = response.json()
    assert "error" in data, "Response should contain 'error'"
    assert "No file uploaded" in data["error"], f"Expected 'No file uploaded', got {data['error']}"

def test_predict_empty_filename():
    """Test the /predict endpoint with an empty filename."""
    files = {'file': ('', BytesIO(b''), 'image/jpeg')}
    response = requests.post(f"{BASE_URL}/predict", files=files)

    assert response.status_code == 400, f"Expected 400, got {response.status_code}"
    data = response.json()
    assert "error" in data, "Response should contain 'error'"
    assert "No file selected" in data["error"], f"Expected 'No file selected', got {data['error']}"

def test_predict_invalid_format():
    """Test the /predict endpoint with an invalid file format."""
    # Create a text file
    text_buffer = BytesIO(b"This is not an image")
    files = {'file': ('test.txt', text_buffer, 'text/plain')}

    response = requests.post(f"{BASE_URL}/predict", files=files)

    assert response.status_code == 400, f"Expected 400, got {response.status_code}"
    data = response.json()
    assert "error" in data, "Response should contain 'error'"
    assert "Invalid file format" in data["error"], f"Expected 'Invalid file format', got {data['error']}"

if __name__ == "__main__":
    # Run the tests
    pytest.main([__file__, "-v"])