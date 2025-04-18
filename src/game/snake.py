import pygame
from utils.constants import SCREEN_WIDTH, SCREEN_HEIGHT, SNAKE_SIZE, COLOR_GREEN

class Snake:
    def __init__(self):
        self.body = [(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2)]
        self.direction = (SNAKE_SIZE, 0)  # Moving right initially
        self.length = 1
        self.grow_pending = False

    def move(self):
        head_x, head_y = self.body[0]
        new_head = (head_x + self.direction[0], head_y + self.direction[1])
        
        # Check wall collision
        if (new_head[0] < 0 or new_head[0] >= SCREEN_WIDTH or 
            new_head[1] < 0 or new_head[1] >= SCREEN_HEIGHT):
            return False
            
        # Check self collision
        if new_head in self.body[1:]:
            return False
            
        self.body.insert(0, new_head)
        if not self.grow_pending:
            self.body.pop()
        else:
            self.grow_pending = False
        return True

    def grow(self):
        self.grow_pending = True

    def handle_input(self, event):
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT and self.direction[0] == 0:
                self.direction = (-SNAKE_SIZE, 0)
            elif event.key == pygame.K_RIGHT and self.direction[0] == 0:
                self.direction = (SNAKE_SIZE, 0)
            elif event.key == pygame.K_UP and self.direction[1] == 0:
                self.direction = (0, -SNAKE_SIZE)
            elif event.key == pygame.K_DOWN and self.direction[1] == 0:
                self.direction = (0, SNAKE_SIZE)

    def draw(self, screen):
        for segment in self.body:
            pygame.draw.rect(screen, COLOR_GREEN, 
                           [segment[0], segment[1], SNAKE_SIZE-2, SNAKE_SIZE-2])

    def collides_with(self, food):
        return self.body[0] == food.position