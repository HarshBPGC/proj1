# Resume to Website Generator

A Flask-based web application that converts resume information into a beautiful personal website. Built with Flask, NiceGUI, and Bootstrap.

## Features

- Interactive form for entering resume information
- Support for personal information, education, work experience, skills, and projects
- Real-time preview of the generated website
- Responsive design that works on all devices
- Modern and professional look

## Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/resume-website-generator.git
cd resume-website-generator
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate
```

3. Install the required packages:
```bash
pip install -r requirements.txt
```

## Usage

1. Start the development server:
```bash
python app.py
```

2. Open your web browser and navigate to:
```
http://localhost:3000
```

3. Fill out the form with your resume information
4. Click "Generate Website" to create your personal website
5. Preview your website and make any necessary adjustments

## Project Structure

```
resume-website-generator/
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
├── templates/         # HTML templates
│   ├── index.html    # Main form page
│   └── preview.html  # Generated website template
└── README.md         # This file
```

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 