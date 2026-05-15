import os
import json
import base64
import io
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input as mobilenet_preprocess
import matplotlib
matplotlib.use('Agg')
import matplotlib.cm as cm

# ----------------------------------------
# Initialize Flask app
# ----------------------------------------
app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://localhost:3001"])

# ----------------------------------------
# Load model and class names
# ----------------------------------------
MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "best_model.keras")
CLASS_NAMES_PATH = os.path.join(os.path.dirname(__file__), "models", "class_names.json")

print("Loading model...")
model = tf.keras.models.load_model(MODEL_PATH)
print("Model loaded successfully!")

with open(CLASS_NAMES_PATH, "r") as f:
    class_names = json.load(f)
print("Classes:", class_names)

# ----------------------------------------
# Load dog detection model
# ----------------------------------------
print("Loading dog detection model...")
dog_checker = MobileNetV2(weights='imagenet', input_shape=(224, 224, 3))
print("Dog detection model loaded!")

DOG_CLASS_START = 151
DOG_CLASS_END = 268
DOG_CONFIDENCE_THRESHOLD = 5

# ----------------------------------------
# Disease information and urgency levels
# ----------------------------------------
disease_info = {
    "cataract": {
        "name": "Cataract",
        "name_si": "කැටරැක්ට්",
        "urgency": "moderate",
        "description": "A cataract is a clouding of the lens inside the eye, which can lead to decreased vision over time.",
        "symptoms": "Cloudy or bluish-grey appearance in the eye, difficulty seeing, bumping into objects.",
        "action": "Schedule a veterinary appointment within the next few days. Cataracts can progress but are not immediately dangerous.",
        "description_si": "ඇසේ කාචය වලාකුළු වීමක් වන අතර, කාලයත් සමඟ පෙනීම අඩු විය හැකිය.",
        "symptoms_si": "ඇසේ වලාකුළු හෝ නිල්-අළු පැහැය, දැකීමේ අපහසුතාව, බාධකවලට ගැටීම.",
        "action_si": "ඉදිරි දින කිහිපය තුළ පශු වෛද්‍ය හමුවීමක් සකසන්න."
    },
    "cherry_eye": {
        "name": "Cherry Eye",
        "name_si": "චෙරි අයි",
        "urgency": "moderate",
        "description": "Cherry eye occurs when the gland of the third eyelid prolapses and becomes visible as a red, swollen mass.",
        "symptoms": "Red or pink fleshy mass visible in the corner of the eye, excessive tearing, eye irritation.",
        "action": "Consult a veterinarian within a few days. Cherry eye is not an emergency but may require surgical correction.",
        "description_si": "තෙවන ඇසි පියන ග්‍රන්ථිය පිටතට පැමිණ රතු, ඉදිමුණු ස්කන්ධයක් ලෙස පෙනේ.",
        "symptoms_si": "ඇසේ කෙළවරේ දිස්වන රතු හෝ රෝස මාංශල ස්කන්ධයක්, අධික කඳුළු, ඇස් කෝපය.",
        "action_si": "දින කිහිපයක් ඇතුළත පශු වෛද්‍යවරයෙකු හමුවන්න."
    },
    "conjunctivitis": {
        "name": "Conjunctivitis",
        "name_si": "කොන්ජන්ක්ටිවයිටිස්",
        "urgency": "low",
        "description": "Conjunctivitis is inflammation of the conjunctiva, the tissue lining the eyelids and covering the white part of the eye.",
        "symptoms": "Redness, swelling, discharge (clear, yellow, or green), squinting, excessive blinking.",
        "action": "Monitor for 24-48 hours. If symptoms persist or worsen, schedule a veterinary visit. Keep the eye area clean.",
        "description_si": "ඇසි පියන් ආවරණය කරන පටක වල ප්‍රදාහයකි.",
        "symptoms_si": "රතු පැහැය, ඉදිමීම, ශ්‍රාවය (පැහැදිලි, කහ හෝ කොළ), ඇස් මිට කිරීම, අධික ඇසිපිය ගැසීම.",
        "action_si": "පැය 24-48 නිරීක්ෂණය කරන්න. රෝග ලක්ෂණ නරක අතට හැරේ නම් පශු වෛද්‍ය හමුවන්න."
    },
    "corneal_ulcer": {
        "name": "Corneal Ulcer",
        "name_si": "කෝනියල් අල්සරය",
        "urgency": "high",
        "description": "A corneal ulcer is an open sore on the cornea that can rapidly worsen and potentially lead to vision loss.",
        "symptoms": "Severe pain, squinting, excessive tearing, cloudy cornea, redness, sensitivity to light.",
        "action": "Seek immediate veterinary care within 24 hours. Corneal ulcers can worsen rapidly and may cause permanent damage.",
        "description_si": "කෝනියාවේ විවෘත තුවාලයක් වන අතර, ඉක්මනින් නරක අතට හැරී පෙනීම නැතිවිය හැකිය.",
        "symptoms_si": "දැඩි වේදනාව, ඇස් මිට කිරීම, අධික කඳුළු, වලාකුළු කෝනියාව, රතු පැහැය, ආලෝකයට සංවේදීතාව.",
        "action_si": "පැය 24 ඇතුළත වහාම පශු වෛද්‍ය ප්‍රතිකාර ලබා ගන්න."
    },
    "entropion": {
        "name": "Entropion",
        "name_si": "එන්ට්‍රෝපියන්",
        "urgency": "moderate",
        "description": "Entropion is a condition where the eyelid rolls inward, causing the eyelashes to rub against the cornea.",
        "symptoms": "Squinting, excessive tearing, eye discharge, rubbing at eyes, swollen eyelids.",
        "action": "Schedule a veterinary appointment within the next few days. Entropion often requires surgical correction.",
        "description_si": "ඇසි පියන ඇතුළට හැරී, ඇස් බැම කෝනියාවට ඇතිල්ලීමට හේතු වේ.",
        "symptoms_si": "ඇස් මිට කිරීම, අධික කඳුළු, ඇස් ශ්‍රාවය, ඇස් අතුල්ලීම, ඉදිමුණු ඇසි පියන්.",
        "action_si": "ඉදිරි දින කිහිපය තුළ පශු වෛද්‍ය හමුවීමක් සකසන්න."
    },
    "healthy": {
        "name": "Healthy Eye",
        "name_si": "සෞඛ්‍ය සම්පන්න ඇස",
        "urgency": "none",
        "description": "No signs of eye disease detected. The eye appears to be in normal, healthy condition.",
        "symptoms": "No abnormal symptoms detected.",
        "action": "No immediate action required. Continue regular eye monitoring and routine veterinary checkups.",
        "description_si": "ඇස් රෝගයක සලකුණු හඳුනාගෙන නැත. ඇස සාමාන්‍ය, සෞඛ්‍ය සම්පන්න තත්ත්වයේ පවතී.",
        "symptoms_si": "අසාමාන්‍ය රෝග ලක්ෂණ හඳුනාගෙන නැත.",
        "action_si": "ක්ෂණික පියවරක් අවශ්‍ය නැත. නිරන්තර ඇස් නිරීක්ෂණය කරන්න."
    }
}

# ----------------------------------------
# Image preprocessing 
# ----------------------------------------
def preprocess_image(image_file):
    img = Image.open(image_file).convert("RGB")
    img = img.resize((224, 224))
    img_array = np.array(img, dtype=np.float32)  # THIS WAS THE BUG - must be float32
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

# ----------------------------------------
# Grad-CAM generation
# ----------------------------------------
def make_gradcam(img_array):
    try:
        resnet = model.get_layer("resnet50")
        last_conv = resnet.get_layer("conv5_block3_out")
        conv_model = tf.keras.Model(inputs=resnet.input, outputs=last_conv.output)

        img_tensor = tf.cast(img_array, tf.float32)
        aug_img = model.get_layer("data_augmentation")(img_tensor, training=False)

        with tf.GradientTape() as tape:
            conv_output = conv_model(aug_img)
            tape.watch(conv_output)

            pooled = tf.reduce_mean(conv_output, axis=[1, 2])
            x = model.get_layer("dense_3")(pooled)
            x = model.get_layer("dropout_2")(x, training=False)
            x = model.get_layer("dense_4")(x)
            x = model.get_layer("dropout_3")(x, training=False)
            predictions = model.get_layer("dense_5")(x)

            class_idx = tf.argmax(predictions[0])
            loss = predictions[:, class_idx]

        grads = tape.gradient(loss, conv_output)
        pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

        heatmap = conv_output[0] @ pooled_grads[..., tf.newaxis]
        heatmap = tf.squeeze(heatmap)
        heatmap = tf.maximum(heatmap, 0) / (tf.math.reduce_max(heatmap) + 1e-8)
        heatmap = heatmap.numpy()

        original_img = img_array[0].astype(np.uint8)
        heatmap_resized = np.uint8(255 * heatmap)
        heatmap_resized = np.array(Image.fromarray(heatmap_resized).resize((224, 224)))

        colormap = cm.get_cmap('jet')
        heatmap_colored = colormap(heatmap_resized / 255.0)[:, :, :3]
        heatmap_colored = np.uint8(255 * heatmap_colored)

        overlay = np.uint8(original_img * 0.5 + heatmap_colored * 0.5)

        img_pil = Image.fromarray(overlay)
        buffer = io.BytesIO()
        img_pil.save(buffer, format='PNG')
        buffer.seek(0)
        img_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')

        return f"data:image/png;base64,{img_base64}"
    except Exception as e:
        print(f"Grad-CAM failed: {e}")
        return None

# ----------------------------------------
# API Routes
# ----------------------------------------
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "running",
        "message": "CanineVision API is active",
        "endpoints": {
            "/predict": "POST - Upload a dog eye image for disease classification",
            "/diseases": "GET - Get information about all diseases",
            "/diseases/<name>": "GET - Get information about a specific disease"
        }
    })

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    allowed_extensions = {".jpg", ".jpeg", ".png", ".bmp", ".gif", ".webp", ".jfif"}
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in allowed_extensions:
        return jsonify({"error": "Invalid file format. Use JPG, PNG, BMP, or GIF"}), 400

    try:
        img_array = preprocess_image(file)

        # STEP 1: Check if image contains a dog
        dog_input = mobilenet_preprocess(img_array.copy())
        dog_preds = dog_checker.predict(dog_input, verbose=0)
        dog_probability = float(np.sum(dog_preds[0][DOG_CLASS_START:DOG_CLASS_END + 1])) * 100

        if dog_probability < DOG_CONFIDENCE_THRESHOLD:
            return jsonify({
                "status": "rejected",
                "message": "The uploaded image does not appear to be a valid dog eye image. Please upload a clear, close-up photo of your dog's eye.",
                "message_si": "උඩුගත කළ රූපය වලංගු බල්ලෙකුගේ ඇසක රූපයක් ලෙස නොපෙනේ.",
                "confidence": round(dog_probability, 2)
            })

        # STEP 2: Classify the eye disease
        prediction = model.predict(img_array, verbose=0)
        predicted_index = int(np.argmax(prediction[0]))
        predicted_class = class_names[predicted_index]
        confidence = float(np.max(prediction[0])) * 100

        # STEP 3: Generate Grad-CAM heatmap
        gradcam_image = make_gradcam(img_array)

        info = disease_info.get(predicted_class, {})

        result = {
            "status": "success",
            "prediction": predicted_class,
            "confidence": round(confidence, 2),
            "urgency": info.get("urgency", "unknown"),
            "disease_name": info.get("name", predicted_class),
            "disease_name_si": info.get("name_si", ""),
            "description": info.get("description", ""),
            "symptoms": info.get("symptoms", ""),
            "action": info.get("action", ""),
            "description_si": info.get("description_si", ""),
            "symptoms_si": info.get("symptoms_si", ""),
            "action_si": info.get("action_si", ""),
            "gradcam_image": gradcam_image,
            "disclaimer": "This is a preliminary screening tool and does not replace professional veterinary diagnosis.",
            "disclaimer_si": "මෙය මූලික පරීක්ෂණ මෙවලමක් වන අතර වෘත්තීය පශු වෛද්‍ය රෝග විනිශ්චය ආදේශ නොකරයි."
        }

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

@app.route("/diseases", methods=["GET"])
def get_all_diseases():
    return jsonify(disease_info)

@app.route("/diseases/<name>", methods=["GET"])
def get_disease(name):
    info = disease_info.get(name)
    if info:
        return jsonify(info)
    return jsonify({"error": "Disease not found"}), 404

# ----------------------------------------
# Nearby veterinary clinics
# ----------------------------------------
clinics = [
    {
        "name": "Negombo Animal Hospital",
        "address": "Main Street, Negombo",
        "phone": "+94 31 222 XXXX",
        "latitude": 7.2094,
        "longitude": 79.8385
    },
    {
        "name": "Pet Care Veterinary Clinic",
        "address": "Colombo Road, Negombo",
        "phone": "+94 31 223 XXXX",
        "latitude": 7.2110,
        "longitude": 79.8400
    },
    {
        "name": "Colombo Veterinary Eye Clinic",
        "address": "Galle Road, Colombo 03",
        "phone": "+94 11 257 XXXX",
        "latitude": 6.9147,
        "longitude": 79.8536
    }
]

@app.route("/clinics", methods=["GET"])
def get_clinics():
    return jsonify(clinics)

# ----------------------------------------
# Run the server
# ----------------------------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)