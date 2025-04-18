import random
import pygame
from utils.constants import SCREEN_WIDTH, SCREEN_HEIGHT, SNAKE_SIZE, COLOR_RED

class Food:
    def __init__(self):
        self.position = self.spawn()

    def spawn(self):
        x = random.randint(0, (SCREEN_WIDTH // SNAKE_SIZE) - 1) * SNAKE_SIZE
        y = random.randint(0, (SCREEN_HEIGHT // SNAKE_SIZE) - 1) * SNAKE_SIZE
        return (x, y)

    def draw(self, screen):
        pygame.draw.rect(screen, COLOR_RED, 
                        [self.position[0], self.position[1], 
                         SNAKE_SIZE-2, SNAKE_SIZE-2])