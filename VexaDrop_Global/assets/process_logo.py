import os
try:
    from PIL import Image
except ImportError:
    print("Pillow is not installed. Please try again after installing.")
    exit(1)

def process_logo():
    input_path = r"C:\Users\strut\OneDrive\Desktop\VexaDrop\VexaDrop_Global\assets\vd_logo.png"
    output_path = r"C:\Users\strut\OneDrive\Desktop\VexaDrop\VexaDrop_Global\assets\vd_logo_final.png"
    
    if not os.path.exists(input_path):
        print(f"Error: {input_path} does not exist.")
        return

    # Load original image
    img = Image.open(input_path)
    # Convert preserving alpha if png
    if img.mode != 'RGBA':
        img = img.convert('RGBA')

    # Target canvas size
    target_size = 1080
    bg_color = "#F8F8F8"
    
    # Padding: 15% on each side = 30% total padding. This leaves 70% for the logo.
    # 1080 * 0.70 = 756
    max_logo_size = int(target_size * 0.70)
    
    # Calculate aspect ratio
    img_ratio = img.width / img.height
    
    if img_ratio > 1:
        # Wider than tall
        new_width = max_logo_size
        new_height = int(max_logo_size / img_ratio)
    else:
        # Taller than wide or square
        new_height = max_logo_size
        new_width = int(max_logo_size * img_ratio)
        
    # Resize the image using LANCZOS filter for high quality
    img_resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
    
    # Create the background canvas
    # Note: the task specifies a solid `#F8F8F8` background color
    canvas = Image.new('RGB', (target_size, target_size), bg_color)
    
    # Calculate centering offset
    offset = ((target_size - new_width) // 2, (target_size - new_height) // 2)
    
    # Paste the logo. If logo has alpha channel, use it as a mask to preserve transparency over the new background
    canvas.paste(img_resized, offset, img_resized)
    
    # Save the result
    canvas.save(output_path, "PNG")
    
    print(f"Success! Logo processed.")
    print(f"Original logo dimensions: {img.width}x{img.height}")
    print(f"Resized logo dimensions: {img_resized.width}x{img_resized.height}")
    print(f"Final canvas dimensions: {canvas.width}x{canvas.height}")
    print(f"Padding applied: {offset[0]}px horizontal, {offset[1]}px vertical")
    print(f"Saved to: {output_path}")

if __name__ == '__main__':
    process_logo()
