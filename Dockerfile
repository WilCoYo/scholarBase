# Use an official PHP runtime with Apache
FROM php:8.0-apache

# Install system dependencies required for pdo_pgsql
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Copy application files into the container
COPY . /var/www/html

# Set the working directory
WORKDIR /var/www/html

# Expose port 80 for HTTP
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]

