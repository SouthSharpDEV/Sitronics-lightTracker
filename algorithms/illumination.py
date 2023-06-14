import cv2
import matplotlib.pyplot as plt
import numpy as np


def preprocess_image(image_path):
    img = plt.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    contours, _ = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    return img, contours


def calculate_brightness_scores(img, contours):
    brightness_scores = []
    for c in contours:
        mask = np.zeros(img.shape[:2], np.uint8)
        cv2.drawContours(mask, [c], 0, 255, -1)
        mean_brightness = cv2.mean(img, mask=mask)[0]
        brightness_scores.append(mean_brightness)
    min_brightness = min(brightness_scores)
    max_brightness = max(brightness_scores)
    normalized_brightness_scores = [(b - min_brightness) / (max_brightness - min_brightness) * 100 for b in brightness_scores]
    return normalized_brightness_scores


def visualize_results(img, contours, normalized_brightness_scores):
    fig, ax = plt.subplots(1, 2, figsize=(12, 6))
    ax[0].imshow(img)
    ax[0].set_title('Исходное изображение')
    for c, s in zip(contours, normalized_brightness_scores):
        cv2.drawContours(img, [c], 0, (0, 255, 0), 2)
        x, y, _, _ = cv2.boundingRect(c)
        cv2.putText(img, f'{s:.0f}', (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)
    ax[1].imshow(img)
    ax[1].set_title('Обнаруженные полигоны')
    mean_brightness = cv2.mean(cv2.cvtColor(img, cv2.COLOR_RGB2GRAY))[0]
    print(f'Средняя яркость всего изображения: {mean_brightness:.2f}')


def main():
    image_path = r'C:\Users\coolm\OneDrive\Рабочий стол\City and Color\photo_2023-05-19_21-14-13.jpg'
    img, contours = preprocess_image(image_path)
    normalized_brightness_scores = calculate_brightness_scores(img, contours)
    visualize_results(img, contours, normalized_brightness_scores)
    plt.show()
main()