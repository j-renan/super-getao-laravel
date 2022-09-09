FROM php:7.4-fpm

RUN apt-get update -y && apt-get install -y \
    libpq-dev libpng-dev libxml2-dev libzip-dev -y \
    openssl zip unzip git libpq-dev postgresql postgresql-client

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN docker-php-ext-install pdo pdo_pgsql

WORKDIR /app

COPY ./composer.json ./

COPY . ./

RUN composer install

CMD php artisan serve --host=0.0.0.0 --port=8003

EXPOSE 8003